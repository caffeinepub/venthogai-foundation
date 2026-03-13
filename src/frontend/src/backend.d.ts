import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface VolunteerApplication {
    areaOfExpertise: string;
    name: string;
    email: string;
    motivation: string;
    timestamp: Time;
    phone: string;
}
export type Time = bigint;
export interface Comment {
    id: bigint;
    content: string;
    storyId: bigint;
    authorName: string;
    timestamp: Time;
}
export interface UserProfile {
    name: string;
}
export interface Story {
    id: bigint;
    title: string;
    content: string;
    authorName: string;
    timestamp: Time;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    deleteComment(commentId: bigint): Promise<void>;
    deleteStory(storyId: bigint): Promise<void>;
    getAllStories(): Promise<Array<Story>>;
    getAllVolunteerApplications(): Promise<Array<VolunteerApplication>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getCommentsByStory(storyId: bigint): Promise<Array<Comment>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    postComment(storyId: bigint, content: string, authorName: string): Promise<bigint>;
    postStory(title: string, content: string, authorName: string): Promise<bigint>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitVolunteerApplication(name: string, email: string, phone: string, areaOfExpertise: string, motivation: string): Promise<void>;
}
