import { Link } from "react-router-dom"
import Header, { SignInHeader } from "../../Header/Header"
import "../../Main/Main.css"
import "../../Header/Header.css"

export const PageNotFound = () => {
    return (
        <>
        <Header>
            <SignInHeader />
        </Header>
        <main>
            <h1>404 Page Not Found <Link to={"/"}>Home</Link></h1>
        </main>
    </>
    )
}