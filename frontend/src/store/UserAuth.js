import axios from "axios";
import toast from "react-hot-toast";
import {create} from "zustand";

export const useUserAuthStore = create((set) => ({
  user: null,
  isLogged: false,
  setUser: (user) => set({ user }),
  setLogged: (data) => set({data}),
  login: async (mobileNumber,pin) => {
    try {
      const response = await axios.post("http://localhost:3500/api/v1/auth/login/", {
        mobileNumber,
        pin,
      },{
        withCredentials: true,
      });
      set({ user: response.data.user});
      console.log("Login :- ",response.data.user.user._id);
      
      // localStorage.setItem('userId',response.data.user.)
      set({isLogged: true})
      toast.success("Login successful!");
    } catch (error) {
      toast.error("Login failed!");
      set({user: null,loading: false});
    }
  },
  fetchUser: async () => {
    try {

    const response = await axios.get('http://localhost:3500/api/v1/auth/me', {withCredentials: true});
    set({ user: response.data.user });
    console.log(response.data.user.user);
    localStorage.setItem("userId",response.data.user.user)
    set({isLogged: true})
    }catch (error) {
      set({ user: null });
    }
  },  
  logout: async () => {
    try {
      await axios.get('http://localhost:3500/api/v1/auth/logout', {withCredentials: true});
      localStorage.removeItem("userId")
      set({ user: null })
      set({ isLogged: false})
      toast.success("Logout successful!");
      
    } catch (error) {
      console.log("Logout failed!", error);
      toast.error("Logout failed!");
    }

  },
}));

