export declare function useAuth(): {
    isAuth: () => boolean;
    authLoader: () => any;
    hasOrGetPermissions: (permission: string[] | string) => Promise<boolean>;
    hasPermissions: (permission: string[] | string) => boolean;
};
