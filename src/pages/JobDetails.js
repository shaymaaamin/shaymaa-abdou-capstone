import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as api from "../api";

function JobDetails() {
    const { id } = useParams();

    const [job, setJob] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        api.jobs.getById(id)
            .then((job) => setJob(job))
            .catch((error) => setError(error.message));
    }, [id]);

    return <></>;
}

export default JobDetails;