import { Link } from "react-router-dom"
import Header, { SignInHeader } from "../../Header/Header"
import { StyledMain } from "../../Main/Main.styled"

export const PageNotFound = () => {
    return (
        <>
        <Header>
            <SignInHeader />
        </Header>
        <StyledMain>
            <h1>404 Page Not Found <Link to={"/"}>Home</Link></h1>
        </StyledMain>
    </>
    )
}