import axios from 'axios';

const buildClient = ({ req }) => {
    if(typeof window === 'undefined') {
        // console.log(req.headers);
        //We're on the server so the request should made to ingress-nginx...
        return axios.create({
            baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
            headers: req.headers
        });
    } else {
        //We're on the browser and we can use the base request structure
        return axios.create({
            baseURL: '/'
        });
    }
};

export default buildClient;