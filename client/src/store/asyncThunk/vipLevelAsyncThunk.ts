import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "@/config/axios";

export const getAllVipLevel = createAsyncThunk(
  "vipLevel/getAllVipLevel",
  async () => {
    const response: any = await axios.get("/vip-level/get-all-vip-level");

    return response;
  }
);
