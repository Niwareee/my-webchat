import {useContext} from "react";
import {useRouter} from "next/router";
import {PlayerContext} from "../../contexts/player";
import {slugify} from "../../utils/Utils";

export default function Home() {
    const {nickname, setNickname} = useContext(PlayerContext)
    const router = useRouter()

    const join = (home) => {
        router.push(`/chats/${slugify(home)}`);
    }

    return (
        <div className="flex h-full w-full items-center justify-center">
            <div className="shadow bg-gray-200 p-4 space-y-2 rounded">
                <div>
                    <h1 className="text-center font-bold">Choose nickname:</h1>
                </div>

                <div className="grid grid-cols-2 gap-2">
                    <input value={nickname} onChange={(event) => setNickname(event.target.value)}/>
                </div>

                <button onClick={() => {
                    if (nickname === "") {
                        alert("Veuillez remplir tout les champs");
                    }
                    join('ChatHome');

                }} className="w-24 h-24 bg-[#226CE9] hover:bg-[#13469D] text-white font-bold rounded">Rejoindre
                </button>

            </div>
        </div>
    );
}