import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type CreateCaseStudyResult = {
    __kind__: "ok";
    ok: CaseStudyId;
} | {
    __kind__: "err";
    err: string;
};
export type Timestamp = bigint;
export type CaseStudyId = bigint;
export interface ContactSubmission {
    id: bigint;
    projectDescription: string;
    name: string;
    submittedAt: Timestamp;
    email: string;
    serviceInterest: ServiceInterest;
}
export type SubmitContactResult = {
    __kind__: "ok";
    ok: ContactId;
} | {
    __kind__: "err";
    err: string;
};
export interface CaseStudy {
    id: CaseStudyId;
    title: string;
    tools: Array<string>;
    clientType: string;
    createdAt: Timestamp;
    keyMetricLabel: string;
    results: Array<CaseStudyResult>;
    iconName: string;
    updatedAt: Timestamp;
    approach: string;
    keyMetric: string;
    problem: string;
    industry: string;
}
export type UpdateCaseStudyResult = {
    __kind__: "ok";
    ok: CaseStudy;
} | {
    __kind__: "err";
    err: string;
};
export interface UpdateCaseStudyInput {
    title: string;
    tools: Array<string>;
    clientType: string;
    keyMetricLabel: string;
    results: Array<CaseStudyResult>;
    iconName: string;
    approach: string;
    keyMetric: string;
    problem: string;
    industry: string;
}
export type ContactId = bigint;
export interface SubmitContactInput {
    projectDescription: string;
    name: string;
    email: string;
    serviceInterest: ServiceInterest;
}
export interface CaseStudyResult {
    metric: string;
    description: string;
}
export interface CreateCaseStudyInput {
    title: string;
    tools: Array<string>;
    clientType: string;
    keyMetricLabel: string;
    results: Array<CaseStudyResult>;
    iconName: string;
    approach: string;
    keyMetric: string;
    problem: string;
    industry: string;
}
export enum ServiceInterest {
    other = "other",
    dataExtraction = "dataExtraction",
    aiAnalytics = "aiAnalytics",
    dataEngineering = "dataEngineering"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createCaseStudy(input: CreateCaseStudyInput): Promise<CreateCaseStudyResult>;
    deleteCaseStudy(id: CaseStudyId): Promise<boolean>;
    getAllCaseStudies(): Promise<Array<CaseStudy>>;
    getCallerUserRole(): Promise<UserRole>;
    getCaseStudyById(id: CaseStudyId): Promise<CaseStudy | null>;
    getContactSubmissions(): Promise<Array<ContactSubmission>>;
    isCallerAdmin(): Promise<boolean>;
    submitContactForm(input: SubmitContactInput): Promise<SubmitContactResult>;
    updateCaseStudy(id: CaseStudyId, input: UpdateCaseStudyInput): Promise<UpdateCaseStudyResult>;
}
