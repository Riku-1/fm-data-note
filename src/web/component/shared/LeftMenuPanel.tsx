import React from "react";
import {Link} from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    display: grid;
    justify-content: space-around;
`

export const LeftMenuPanel = () => {
    return (
        <Container>
            <Link to="/load-file">Load file</Link>
            <Link to="/player">Player</Link>
            <Link to="/club">Club</Link>
        </Container>
    )
}