import { useEffect, useState } from "react";
import CommunityChatGroupListGroup from "./CommunityChatGroupListGroup";
import { getDomains } from "../../services/APIConfig";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "../../services/APIUtils";
import { getAccessToken } from "../../features/User/UserDetails";

export default function CommunityChatGroupList() {
  const config = {
    headers: {
      accesstoken: getAccessToken(),
    },
  };
  const liveRoomsQuery = useQuery({
    queryKey: ["LiveRooms"],
    queryFn: () =>
      axios.get(`${API_URL}api/v1/chatLiveRooms`, config).then((res) => {
        return res;
      }),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return (
    <aside id="chat-selector">
      <p className="heading body-md-regular">Groups</p>
      {liveRoomsQuery.isSuccess && (
        <div className="group-list">
          {liveRoomsQuery?.data?.data?.data?.map((group) => (
            <CommunityChatGroupListGroup key={group._id} group={group} />
          ))}
        </div>
      )}
      {liveRoomsQuery.isLoading && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="spinner-border text-primary" role="status">
            <span className="sr-only"></span>
          </div>
        </div>
      )}
    </aside>
  );
}
