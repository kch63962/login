import axios from "axios";
import { useEffect, useState } from "react";
import SeverApi from "../../api/api";

const MyImage = () => {
  const [userImages, setUserImages] = useState([]);
  useEffect(() => {
    try {
      const response = axios
        .get(`${SeverApi}/users/${localStorage.getItem("id")}/images/`)
        .then((response) => setUserImages(response.data.user_images));
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const delBtn = (imageName) => {
    axios
      .delete(
        `${SeverApi}/users/${localStorage.getItem("id")}/images/${imageName}`
      )
      .then((response) => {
        console.log(response);
        setUserImages((prevImages) =>
          prevImages.filter((image) => image.name !== imageName)
        );
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      {userImages.map((image, index) => (
        <div style={{ display: "inline-table" }}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <img
              style={{ padding: "20px", widht: "100px", height: "100px" }}
              src={image.url}
              key={index}
              alt={image.name}
            />
            <span
              style={{
                textAlign: "center",
                fontWeight: "bold",
                fontSize: "20px",
              }}
            >
              {image.name}
            </span>
            <button type='button' onClick={() => delBtn(image.name)}>
              del
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyImage;
