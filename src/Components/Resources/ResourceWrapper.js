import { useParams } from "react-router-dom";
import ResourceSubWrapper from "./ResourceSubWrapper";

function ResourceWrapper() {
  const { domain } = useParams();

  return (
    <div>
      <ResourceSubWrapper
        domain={domain}
        heading={`Resources for ${domain}`}
        text="engineerhub provides various resources to help students build up their knowledge and prepare themselves for placements and other exams."
      />
    </div>
  );
}

export default ResourceWrapper;
