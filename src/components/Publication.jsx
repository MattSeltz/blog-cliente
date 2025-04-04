import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Divider, Avatar, Menu, MenuItem, Grow } from "@mui/material";

import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";

import { setGlobalUser } from "../contexts/userSlice";
import {
	getData,
	getOneData,
	updateData,
	deleteData,
} from "../services/services";
import { PublicationEdit } from "./PublicationEdit";

export const Publication = ({ publication, setPublicationList }) => {
	const userGlobal = useSelector((state) => state.user.value);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [isLiked, setIsLiked] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [isOpen, setIsOpen] = useState(false);

	const open = Boolean(anchorEl);

	useEffect(() => {
		getOneData("/publication/", publication._id)
			.then((res) => {
				const isMatch = res.likes.filter(
					(item) => item._id === userGlobal?._id
				);

				isMatch.length > 0 ? setIsLiked(true) : setIsLiked(false);
			})
			.catch((e) => console.error(e));
	}, [userGlobal]);

	const sendLike = async (like) => {
		if (!userGlobal) {
			alert("Inicia sesión para interactuar...");
			navigate("/login");
			return;
		}

		if (like) {
			const { likes } = await getOneData("/publication/", publication._id);
			likes.push(userGlobal._id);
			await updateData("/publication/", publication._id, {
				likes,
			});

			const user = await getOneData("/user/", userGlobal._id);
			user.likes.push(publication._id);
			const userJSON = await updateData("/user/", userGlobal._id, {
				likes: user.likes,
			});

			const res = await getData("/publication");

			dispatch(setGlobalUser(userJSON));
			setPublicationList(res.reverse());
			setIsLiked(like);
		} else {
			const { likes } = await getOneData("/publication/", publication._id);
			const disLike = likes.filter((item) => item._id !== userGlobal._id);
			await updateData("/publication/", publication._id, {
				likes: disLike,
			});

			const user = await getOneData("/user/", userGlobal._id);
			const disLikeUser = user.likes.filter(
				(item) => item._id !== publication._id
			);
			const userJSON = await updateData("/user/", userGlobal._id, {
				likes: disLikeUser,
			});

			const res = await getData("/publication");

			dispatch(setGlobalUser(userJSON));
			setPublicationList(res.reverse());
			setIsLiked(like);
		}
	};

	const deletePublication = async () => {
		const { comments } = await getOneData("/publication/", publication._id);
		comments.forEach(async (item) => await deleteData("/comment/", item._id));

		const user = await getOneData("/user/", userGlobal._id);
		const filteredLikes = user.likes.filter(
			(item) => item._id !== publication._id
		);
		const filteredUserPublications = user.publications.filter(
			(item) => item._id !== publication._id
		);
		const commentLikes = user.commentLikes.filter(
			(item) => item.publication[0]._id !== publication._id
		);
		const filteredUser = user.comments.filter(
			(item) => item.publication[0]._id !== publication._id
		);
		const userJSON = await updateData("/user/", userGlobal._id, {
			likes: filteredLikes,
			comments: filteredUser,
			commentLikes,
			publications: filteredUserPublications,
		});

		await deleteData("/publication/", publication._id);

		const res = await getData("/publication");
		dispatch(setGlobalUser(userJSON));
		setPublicationList(res.reverse());
	};

	return (
		<Grow in={publication}>
			<article
				id={publication._id}
				className="flex flex-col items-start justify-between shadow-md p-3 rounded-md"
			>
				<div className="flex justify-between items-center gap-x-4 text-xs w-full">
					<div className="flex items-center gap-3">
						<Avatar
							alt={publication.author[0].username}
							src={publication.author[0].icon}
						/>
						<p className="font-semibold text-gray-900">
							<Link
								to={
									userGlobal?._id === publication.author[0]._id
										? "/profile"
										: `/user/${publication.author[0]._id}`
								}
							>
								{publication.author[0].username}
							</Link>
						</p>
					</div>
					<div className="flex items-center">
						<time dateTime={publication.date} className="text-gray-500">
							{publication.date.split("T")[0]}{" "}
							{publication.date.split("T")[1].split(":")[0] - 3}:
							{publication.date.split("T")[1].split(":")[1]}
						</time>
						{userGlobal?._id === publication.author[0]._id && (
							<MoreVertIcon
								className="cursor-pointer"
								onClick={(e) => setAnchorEl(e.currentTarget)}
							/>
						)}
						<Menu
							id="basic-menu"
							anchorEl={anchorEl}
							open={open}
							onClose={() => setAnchorEl(null)}
							MenuListProps={{
								"aria-labelledby": "basic-button",
							}}
						>
							<MenuItem
								onClick={() => {
									setAnchorEl(null);
									setIsOpen(true);
								}}
							>
								<EditIcon /> Editar
							</MenuItem>
							<MenuItem onClick={deletePublication}>
								<DeleteIcon /> Eliminar
							</MenuItem>
						</Menu>
					</div>
				</div>
				<PublicationEdit
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					publication={publication}
					setPublicationList={setPublicationList}
				/>
				<div className="group relative w-full">
					<h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 ">
						{publication.title}
					</h3>
					<p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
						{publication.content}
					</p>
					<br />
					<Divider />
					<div className="flex justify-between mt-3">
						<div className="flex gap-1">
							{isLiked ? (
								<Grow in={isLiked}>
									<FavoriteIcon
										onClick={() => sendLike(false)}
										className="cursor-pointer"
									/>
								</Grow>
							) : (
								<FavoriteBorderIcon
									onClick={() => sendLike(true)}
									className="cursor-pointer"
								/>
							)}

							<span>
								<b>{publication.likes.length}</b>
							</span>
						</div>

						<Link
							to={`/publication/${publication._id}`}
							className="cursor-pointer"
						>
							<ChatBubbleOutlineIcon /> <b>{publication.comments.length}</b>
						</Link>
					</div>
				</div>
			</article>
		</Grow>
	);
};
