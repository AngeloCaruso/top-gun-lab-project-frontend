import { Result } from "antd";
import React from "react";
import { Link } from "react-router-dom";

function Page404() {
    return (
        <>
            <main style={{ padding: "1rem" }}>
                <Result
                    status="404"
                    title="404"
                    subTitle="Sorry, the page you visited does not exist."
                    extra={<Link to={`/dashboard/jobs`} type="primary">Back Home</Link>}
                />
            </main>
        </>
    );
}

export default Page404;