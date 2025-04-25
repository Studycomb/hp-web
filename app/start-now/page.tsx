"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { logout, deleteAccount } from "../actions/auth";
import { getClientAuthProvider } from "@/lib/auth/factory/getClientProvider";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  // TODO: handle loading state, now it is displayed the page before the redirect
  const [user, setUser] = useState<any | null>(undefined);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const authProvider = getClientAuthProvider();
  useEffect(() => {
    const checkUser = async () => {
      const currentUser = await authProvider.getCurrentUser();
      setUser(currentUser);
      if (!currentUser) {
        router.replace("/login");
      }
    };
    checkUser();
  }, []);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      await deleteAccount(new FormData());
    } catch (error) {
      console.error('Error deleting account:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  if (user === undefined) {
    return <div className="flex items-center justify-center min-h-screen"> Loading ...</div>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-gray-50 to-gray-100">
      <main className="flex-grow flex flex-col items-center justify-center px-4 pt-16 pb-8">
        <form>
          <Button formAction={logout} className="w-full bg-mindswarm-500 hover:bg-mindswarm-600 text-white bg-black">
            Logout
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="w-full bg-mindswarm-500 hover:bg-mindswarm-600 text-white bg-black mt-4">
                Delete My Account
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently delete your account
                  and remove all associated data from our servers.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button 
                  onClick={handleDelete} 
                  variant="destructive" 
                  className="w-full"
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete Account"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </form>
      </main>
    </div>
  );
}
