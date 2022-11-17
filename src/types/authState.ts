interface AuthState{
    data: object | null,
    isReady: boolean,
    loginError: boolean | null,
    registrationError: boolean | null
}

export default AuthState