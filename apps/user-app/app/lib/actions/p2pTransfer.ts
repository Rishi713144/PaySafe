"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";

export async function p2pTransfer(to: string, amount: number) {
    try {
        const session = await getServerSession(authOptions);
        const from = session?.user?.id;
        
        if (!from) {
            return {
                success: false,
                message: "Unauthorized. Please login again."
            }
        }

        // Validate amount
        if (!amount || amount <= 0) {
            return {
                success: false,
                message: "Invalid amount"
            }
        }

        // Find recipient
        const toUser = await prisma.user.findFirst({
            where: {
                number: to
            }
        });

        if (!toUser) {
            return {
                success: false,
                message: "User not found"
            }
        }

        // Prevent self-transfer
        if (Number(from) === toUser.id) {
            return {
                success: false,
                message: "Cannot transfer to yourself"
            }
        }

        // Execute transaction
        await prisma.$transaction(async (tx) => {
            // Lock the sender's balance row
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(from)} FOR UPDATE`;
            
            const fromBalance = await tx.balance.findUnique({
                where: { userId: Number(from) },
            });
            
            if (!fromBalance || fromBalance.amount < amount) {
                throw new Error('Insufficient funds');
            }

            // Deduct from sender
            await tx.balance.update({
                where: { userId: Number(from) },
                data: { amount: { decrement: amount } },
            });

            // Add to recipient
            await tx.balance.update({
                where: { userId: toUser.id },
                data: { amount: { increment: amount } },
            });

            // Record the transfer
            await tx.p2pTransfer.create({
                data: {
                    fromUserId: Number(from),
                    toUserId: toUser.id,
                    amount: amount,
                    timestamp: new Date(),
                },
            });
        });

        return {
            success: true,
            message: "Transfer successful"
        }

    } catch (error: any) {
        console.error("P2P Transfer error:", error);
        
        // Handle specific error cases
        if (error.message === 'Insufficient funds') {
            return {
                success: false,
                message: "Insufficient balance"
            }
        }

        return {
            success: false,
            message: "Transfer failed. Please try again."
        }
    }
}