import axios from "axios";
import "./ClubCoverPhoto.css";
import { MdDelete } from "react-icons/md";
import { getAccessToken } from "../../features/getCookieValues";
import { API_URL } from "../../services/APIUtils";
export default function ClubCoverPhoto({ addOption, imageUrl, index }) {
  function handleDelete() {
    console.log("delete");
    const config = {
      headers: {
        accessToken: getAccessToken(),
      },
    };
    axios
      .delete(`${API_URL}api/v1/club/deleteClubPhotos`, { index }, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }
  if (addOption) {
    let file = new FormData();
    file.append("clubPhotos", imageUrl);
    const controller = new AbortController();
    const config = {
      headers: {
        accessToken: getAccessToken(),
      },
    };
    axios
      .patch(`${API_URL}api/v1/club/updateClubPhotos`, file, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        if (axios.isCancel(err)) {
          console.log("req cancel");
        } else {
          console.log("req performed");
        }
      });

    return (
      <div
        style={{
          backgroundImage: `url(${URL.createObjectURL(imageUrl)})`,
        }}
        className="cover-photo-edit-container"
      >
        <div onClick={handleDelete} className="delete-option">
          <MdDelete />
        </div>
      </div>
    );
  }
  return (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
      }}
      className="cover-photo-edit-container"
    >
      <div onClick={handleDelete} className="delete-option">
        <MdDelete />
      </div>
    </div>
  );
}
