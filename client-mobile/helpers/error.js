export const errorHelper = (err) => {
    try {
        return err?.message
    } catch (error) {
        return 'Internal Server Error'
    }
}