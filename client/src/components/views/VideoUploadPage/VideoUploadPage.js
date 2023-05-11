import React from 'react';
import styled from 'styled-components';
import Dropzone from 'react-dropzone';
import { AiOutlinePlus } from 'react-icons/ai';

function VideoUploadPage() {
  return (
    <Container>
      <UploadForm action="">
        <Title>Upload Video</Title>
        <div>
          {/* drop zone */}
          <Dropzone onDrop multiple maxSize>
            {({ getRootProps, getInputProps }) => (
              <DropzoneContainer {...getRootProps()}>
                <input {...getInputProps()} />
                <AiOutlinePlus className="icon" />
              </DropzoneContainer>
            )}
          </Dropzone>

          {/* thumbnail */}
          <div>
            <img src="" alt="" />
          </div>
        </div>

        <InputContainer>
          <label htmlFor="">Title</label>
          <input type="text" placeholder="Title" required="required" />
        </InputContainer>

        <InputContainer>
          <label htmlFor="">Description</label>
          <textarea
            name=""
            id=""
            cols="30"
            rows="1"
            placeholder="Description"
            required="required"
          ></textarea>
        </InputContainer>

        <select name="" id="">
          <option value=""></option>
        </select>

        <select name="" id="">
          <option value=""></option>
        </select>

        <SubmitButton>Submit</SubmitButton>
      </UploadForm>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  max-width: 1080px;
  height: 100vh;
  display: flex;
  flex-direction: column;
  margin: 10% auto 0;
`;
const Title = styled.h1`
  font-weight: 700;
  font-size: 32px;
  margin-bottom: 1rem;
`;
const UploadForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1.5rem;
`;
const DropzoneContainer = styled.div`
  background-color: #1c1c1e;
  width: 45%;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.75rem;

  .icon {
    color: #e5e5ea;
    font-size: 30px;
  }
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    display: none;
  }

  textarea,
  input {
    background-color: #e5e5ea;
    background-color: transparent;
    outline: none;
    border: none;
    transition: 0.35s all;
    font-size: 14px;
    font-family: normal;
    padding: 1.5rem 0;
    border-bottom: 1px solid #c7c7cc;

    &:focus {
      border-color: #1c1c1e;
    }

    &:valid {
      border-color: #1c1c1e;
    }
  }

  textarea {
    /* border: 1px solid #c7c7cc; */
    /* padding: 0.5rem; */
    resize: none;
  }

  input {
    height: 2rem;
  }
`;
const SubmitButton = styled.button`
  background-color: #1c1c1e;
  color: #f2f2f7;
  border: none;
  height: 3rem;
  border-radius: 8px;
  font-weight: 400;
  cursor: pointer;
  margin-top: 2rem;
  font-size: 14px;
`;

export default VideoUploadPage;
