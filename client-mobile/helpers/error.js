export const errorHelper = (err) => {
    try {
        return JSON.parse(err)?.message
    } catch (error) {
        return 'Internal Server Error'
    }
}