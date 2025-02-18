import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/components/config/axios";

export const getAllVipLevel = createAsyncThunk(
  "vipLevel/getAllVipLevel",
  async () => {
    const response: any = await axios.get("/user/vip-levels");

    return response;
  }
);
