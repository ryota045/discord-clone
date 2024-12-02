import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";

export const initialProfile = async () => {
    const user = await currentUser();  // 現在のユーザーを取得
    if (!user) {
        // ユーザーが存在しない場合、サインインページにリダイレクト
        console.log("no user")
        auth().redirectToSignIn()        
        return
    }

    try{
        const profile = await db.profile.findUnique({
            where: {
                userId: user!.id,  // ユーザーIDに基づいてプロファイルを検索
            },
        });

        if (profile) {
            return profile;  // 既存のプロファイルが見つかった場合、それを返す
        }

        const newProfile = await db.profile.create({
            data: {
                userId: user!.id,  // 新しいプロファイルを作成
                name: `${user!.firstName} ${user!.lastName}`,  // ユーザーの名前を設定
                imageUrl: user!.imageUrl,  // ユーザーの画像URLを設定
                email: user!.emailAddresses[0].emailAddress,  // ユーザーのメールアドレスを設定
            },
        });

        return newProfile;  // 新しいプロファイルを返す
    } catch (error) {
        console.error(error);
        throw new Error("Failed to create initial profile");
    }
}