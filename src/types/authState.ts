export default interface AuthState{
    data: object | null,
    isReady: boolean,
    loginError: boolean | null,
    registrationError: boolean | null
}