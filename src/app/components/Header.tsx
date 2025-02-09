"use client";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserButton, useUser } from "@clerk/nextjs";
import dynamic from "next/dynamic";
// import { CometChat } from '@cometchat/chat-sdk-javascript';

// Dynamically import SignInButton from Clerk with SSR disabled so that it's properly recognized as a React component.
const ClerkSignInButton = dynamic(
  () => import("@clerk/nextjs").then((mod) => mod.SignInButton),
  { ssr: false }
);

export default function Header() {
  const [isClient, setIsClient] = useState(false);
  const router = useRouter();
  const { isSignedIn } = useUser();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  // const loginToCometChat = async (userId: string) => {
  //   try {
  //     const authKey = process.env.NEXT_PUBLIC_COMETCHAT_AUTH_KEY;
  //     if (!authKey) {
  //       throw new Error('CometChat Auth Key not found');
  //     }
  //     await CometChat.login(userId, authKey);
  //   } catch (error) {
  //     console.error('CometChat login failed:', error);
  //   }
  // };
 
  return (
    <div>
      {isClient && (
        <AppBar position="fixed" sx={{ backgroundColor: "black", zIndex: 1100 }}>
          <Toolbar>
            <Typography
              variant="h6"
              sx={{ flexGrow: 1, cursor: "pointer" }}
              onClick={() => handleNavigation("/")}
            >
              MediMind
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button color="inherit" onClick={() => handleNavigation("/")}>
                Home
              </Button>
              <Button
                color="inherit"
                onClick={() => handleNavigation("/medical-analysis")}
              >
                Medical Analysis
              </Button>
              <Button
                color="inherit"
                onClick={() => handleNavigation("/appointments")}
              >
                Appointments
              </Button>
              {isSignedIn ? (
                <UserButton afterSignOutUrl="/" />
              ) : (
                <ClerkSignInButton mode="modal">
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "#2196F3",
                      color: "white",
                      "&:hover": { backgroundColor: "#1565C0" },
                      textTransform: "none",
                      px: 3,
                      py: 1,
                    }}
                  >
                    Sign In
                  </Button>
                </ClerkSignInButton>
              )}
            </Box>
          </Toolbar>
        </AppBar>
      )}
    </div>
  );
}
