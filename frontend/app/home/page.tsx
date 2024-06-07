"use client";
import Image from "next/image";
import styles from "./page.module.css";
import {
  Button,
  HomeInput,
  Modal,
  Navbar,
  Pagination,
  Table,
} from "@/components";
import { useEffect, useState } from "react";
import { truncateLink } from "@/utils/truncatelink";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useUrlShortener } from "@/hooks/useUrlShortener";
import { useRouter } from 'next/navigation'

export default function Home() {
  const { user } = useAuthContext();
  const { token } = user ?? { token: null };
  
const router = useRouter();

  if(!token){
    router.push("/")
  }
  console.log(token)
  const {shorten ,loading} = useUrlShortener();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentLink, setCurrentLink] = useState("");
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [description, setDescription] = useState("");
  const [icon ,setIcon] = useState("/copyIcon.svg")
  const [trigger,setTrigger] = useState(false)
 const [nameError , setNameError] =  useState("");
 const [descriptionError , setDescriptionError] =  useState("");
 const [linkError , setLinkError] =  useState("");

  const handleShorten = async () => {
    if(name === ""){
      setNameError("Input name [50 char max]")
    }
    if(description === ""){
setDescriptionError("Input a description [50 char max]")
    }
    if(link === ""){
      setLinkError("Input a link to shorten")
    }
    const { token } = user ?? { token: null };
    if (token && nameError == "" && descriptionError == "" && linkError == "") {
      const shortenedUrl = await shorten({
        name,
        description,
        link,
        token,
      });
      if (shortenedUrl) {
        console.log(shortenedUrl,name);
        setCurrentLink(shortenedUrl);
        setIsModalOpen(true);
        setTrigger(true)
        setTimeout(() => {
          setTrigger(false)
        }, 2000);
      }
    } else {
      console.error("No token available");
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentLink);
    setIcon("/cpicon.svg");
    setTimeout(() => {
      setIcon("/copyIcon.svg");
    }, 2000);
  };

  const handleOpenModal = (link: string) => {
    setCurrentLink(`
    http://localhost:3333/api/${link}`);
    setIsModalOpen(true);
   
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={styles.content}>
      <Navbar />
      <main className={styles.wrapper}>
        <div className={styles.top}>
          <div className={styles.topLeft}>
            <p className={styles.topText}>Shorten URL</p>
            <div className={styles.inputs}>
              <HomeInput
                label="Name"
                placeholderText="Input name"
                value={name}
                onchange={(e) => {
                  setName(e.target.value);
                  setNameError("")
                }}
              />
              {nameError && <div className={styles.erro}>{nameError}</div>}
              <HomeInput
                label="Website"
                placeholderText="www.website.com"
                httpText="http://"
                value={link}
                onchange={(e) => {
                  setLink(e.target.value);
                  setLinkError("")
                }}
              />
              {linkError && <div className={styles.error}>{linkError}</div>}
              <HomeInput
                label="Description"
                placeholderText="Input description"
                value={description}
                onchange={(e) => {
                  setDescription(e.target.value);
                  setDescriptionError("")
                }}
              />
              {descriptionError && <div className={styles.error}>{descriptionError}</div>}
            </div>

            <Button text={loading ? "Shortening URL ..." : "Shorten URL"} onclick={handleShorten} disabled={loading} />
          </div>
        </div>

        <div className={styles.bottom}>
          <Table onClick={handleOpenModal}  triggerFetch={trigger}/>
        </div>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <Image src="/colorLink.svg" height={48} width={48} alt="icon" />
          <h2 className={styles.info}>View full URL</h2>

          <div className={styles.modal_outputWrapper}>
            <p className={styles.modal_labelText}>Share Link</p>
            <div className={styles.modal_URL}>
              <div className={styles.modal_URLText}>{currentLink}</div>
              <Image
                src={icon}
                alt="icon"
                width={40}
                height={40}
                style={{
                  cursor: "pointer",

                }}
                onClick={handleCopy}
              />
            </div>
          </div>
          <p></p>

          <div className={styles.buttons}>
            <Button
              text="Cancel"
              onclick={handleCloseModal}
              classname={styles.cancel}
            />
            <Button text="Done" onclick={handleCloseModal} />
          </div>
        </Modal>
      </main>
    </div>
  );
}
