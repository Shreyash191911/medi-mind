// Updated cometChat.ts

let CometChatInstance: any;

const initCometChatIfNeeded = async () => {
  // Only proceed if window is available (i.e. on the client)
  if (typeof window === "undefined") return null;
  
  if (!CometChatInstance) {
    // Use dynamic import so this code runs only on the client
    const module = await import("@cometchat/chat-sdk-javascript");
    CometChatInstance = module.CometChat;
    
    const appSetting = new CometChatInstance.AppSettingsBuilder()
      .subscribePresenceForAllUsers()
      .setRegion("in")
      .build();

    await CometChatInstance.init("270477ca7cdbe023", appSetting);
  }
  return CometChatInstance;
};


export const loginCometChat = async (userId: string) => {
  try {
    const CometChat = await initCometChatIfNeeded();
    if (!CometChat) throw new Error('CometChat not initialized');

    // First check if already logged in
    const currentUser = await CometChat.getLoggedinUser();
    if (currentUser) return currentUser;

    // Create user first (if doesn't exist)
    const user = new CometChat.User(userId);
    user.setName(userId);

    try {
      await CometChat.createUser(user, '1aebd5713c1d918c7635c61720439715f8354af7');
    } catch (e) {
      console.log('User might already exist, proceeding to login');
    }

    // Login
    const loggedInUser = await CometChat.login(userId, '1aebd5713c1d918c7635c61720439715f8354af7');
    if (!loggedInUser) throw new Error('Login failed');
    
    console.log('CometChat login successful:', loggedInUser);
    return loggedInUser;
  } catch (error: any) {
    console.error('CometChat login failed:', error.message || error);
    throw error;
  }
};

export const initializeVideoCall = async (userId: string, receiverId: string) => {
  try {
    const CometChat = await initCometChatIfNeeded();
    if (!CometChat) throw new Error('CometChat not initialized');

    // First check if user is logged in
    const loggedInUser = await CometChat.getLoggedinUser();
    if (!loggedInUser) {
      // Try to login again if not logged in
      await loginCometChat(userId);
    }

    // Create a new call session
    const call = new CometChat.Call(
      receiverId,
      CometChat.CALL_TYPE.VIDEO,
      CometChat.RECEIVER_TYPE.USER
    );

    const outgoingCall = await CometChat.initiateCall(call);
    if (!outgoingCall) throw new Error('Failed to initiate call');

    return outgoingCall;
  } catch (error: any) {
    console.error('Error initializing video call:', error.message || error);
    throw error;
  }
};

export const initCometChat = async () => {
  try {
    const CometChat = await initCometChatIfNeeded();
    if (!CometChat) {
      throw new Error('CometChat initialization failed');
    }
    console.log('CometChat initialized successfully');
    return CometChat;
  } catch (error) {
    console.error('CometChat initialization failed:', error);
    throw error;
  }
};

export const CometChatFunctions = {
  addCallListener: async (...args: any[]) => {
    const CometChat = await initCometChatIfNeeded();
    if (CometChat) return CometChat.addCallListener(...args);
  },
  removeCallListener: async (...args: any[]) => {
    const CometChat = await initCometChatIfNeeded();
    if (CometChat) return CometChat.removeCallListener(...args);
  },
  startCall: async (...args: any[]) => {
    const CometChat = await initCometChatIfNeeded();
    if (CometChat) return CometChat.startCall(...args);
  }
}; 