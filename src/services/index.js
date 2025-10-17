import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const API = axios({
    baseURL: "http://localhost:3000"
})

export const queryClient = new QueryClient()