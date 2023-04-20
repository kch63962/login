import { useEffect, useRef, useState } from "react";
import { Header } from "./HomeForm.styles";
import { useNavigate } from "react-router-dom";
import camera from "../../Images/camera.png";
import { render } from "@testing-library/react";
import SeverApi from "../../api/api";

const HomeForm = () => {
  const navigate = useNavigate();
  const imgRef = useRef();
  const [uploadImg, setUploadImg] = useState("");
  const [fileName, setFileName] = useState("");
  const [uploadFile, setUploadFile] = useState();
  const [imagesUrls, setImagesUrls] = useState([]);

  useEffect(() => {
    if (!localStorage.getItem("id")) {
      navigate("/");
      return;
    }

    const fetchData = async () => {
      const response = await fetch(`${SeverApi}/s3/images/`);
      const data = await response.json();
      setImagesUrls(data.s3_images);
    };
    fetchData();
  }, [navigate]);

  const ImgFile = () => {
    const file = imgRef.current.files[0];
    if (!file) return;
    setUploadFile(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setUploadImg(reader.result);
    };
  };

  const ImageUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", uploadFile);

    if (!fileName) {
      alert("이미지 이름을 입력해주세요");
      return;
    }

    try {
      const response = await fetch(
        `${SeverApi}/users/${localStorage.getItem(
          "id"
        )}/images/?filename=${fileName}`,
        {
          method: "POST",
          body: formData,
        }
      );

      if (!response.ok) {
        console.log(response);
      }
      const data = await response.json();
      console.log(data);
      alert("파일 업로드 성공");
      setImagesUrls((pre) => [...pre, data.my_image]);
      setFileName("");
      setUploadImg("");
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Header>
        <div style={{ width: "400px" }}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              margin: "0 auto",
              position: "fixed",
              width: "400px",
            }}
            onSubmit={ImageUpload}
          >
            <img
              style={{
                width: "320px",
                height: "300px",
                margin: "auto",
                borderRadius: "5px",
                marginBottom: "10px",
                backgroundColor: "white",
                marginTop: "20px",
              }}
              alt='이미지'
              src={uploadImg ? uploadImg : camera}
            />
            <input
              type='text'
              value={fileName}
              placeholder='사진 이름'
              style={{
                width: "300px",
                margin: "auto",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "5px",
                border: "none",
                fontSize: "16px",
              }}
              onChange={(e) => {
                setFileName(e.target.value);
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "322px",
                margin: "auto",
              }}
            >
              <label
                style={{
                  fontSize: "16px",
                  color: "#666",
                  borderRadius: "5px",
                  padding: "15px 10px",
                  cursor: "pointer",
                  textAlign: "center",
                  width: "45%",
                  backgroundColor: "white",
                }}
                htmlFor='image'
              >
                이미지 업로드
              </label>
              <input
                style={{ display: "none" }}
                id='image'
                type='file'
                accept='image/*'
                ref={imgRef}
                onChange={ImgFile}
              />

              <button
                style={{
                  fontSize: "16px",
                  border: "none",
                  color: "#666",
                  borderRadius: "5px",
                  padding: "15px 10px",
                  cursor: "pointer",
                  textAlign: "center",
                  width: "45%",
                  backgroundColor: "white",
                  fontFamily: `"Roboto", sans-serif`,
                  fontWeight: "600",
                }}
                type='submit'
              >
                이미지 보내기
              </button>
            </div>
          </form>
        </div>
      </Header>
      <div
      // style={{
      //   border: "1px solid #bbb",
      // }}
      >
        {imagesUrls.map((url, index) => (
          <img
            style={{
              width: "200px",
              height: "200px",
              margin: "20px",
              boxShadow: "10px 5px 5px #ddd",
            }}
            src={url}
            alt={`image_${index}`}
            key={index}
          />
        ))}
      </div>
    </div>
  );
};

export default HomeForm;
