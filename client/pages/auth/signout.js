import Router from "next/router";
import { useEffect } from "react";
import UseRequest from "../../hooks/useRequest";

const SignOut = () => {

    const { doRequest, errors } = UseRequest({
        url: '/api/users/signout',
        method: 'post',
        body: {},
        onSuccess: () => Router.push('/')
    });

    useEffect(() => {
        doRequest();
    }, [])

    return (
        <div>
            Signing out...
        </div>
    );
};

export default SignOut;