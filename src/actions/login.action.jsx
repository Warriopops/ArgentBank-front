import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post("http://localhost:3001/api/v1/user/login", {
        email,
        password,
      });

      const token = response.data.body.token;
      localStorage.setItem("token", token);

      const profileResponse = await axios.get("http://localhost:3001/api/v1/user/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const firstName = profileResponse.data.body.firstName;
      localStorage.setItem("userName", firstName);

      return { token, firstName };
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || "Erreur lors de la connexion");
    }
  }
);
