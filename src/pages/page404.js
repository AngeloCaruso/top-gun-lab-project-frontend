import { Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { env } from "../config/.env";

function Page404() {
    return (
        <>
            <main style={{ padding: "1rem" }}>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Link to={`${env.url}/dashboard/jobs`} type="primary">Back Home</Link>}
                />
            </main>
        </>
    );
}

export default Page404;