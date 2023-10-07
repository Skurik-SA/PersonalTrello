import styles from "./LoginPage.module.css"

const LoginPage = () => {
    function removeDuplicates2(arr) {
        return arr.map(item => {
            if (!arr.includes(item)) {
                return item
            }
        })
    }


    function removeDuplicates(arr) {
        const res = []
        arr.forEach((item, index) => {
            if(!res.includes(item)) {
                res.push(item)
            }
        })
        return res
    }

    const x = [1, 2, 2, 3, 3, 5, 6, 7, 7]

    return (
        <>
            Login {removeDuplicates(x)} | {removeDuplicates2(x)}
        </>
    )
}

export default LoginPage;