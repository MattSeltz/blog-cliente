import { Avatar, Divider, Menu, MenuItem, Grow } from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { deleteData, getOneData, updateData } from "../services/services";
import { setGlobalUser } from "../contexts/userSlice";
import { CommentEdit } from "./CommentEdit";

export const Comment = ({ comment, setCommentList }) => {
	const userGlobal = useSelector((state) => state.user.value);
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [isLiked, setIsLiked] = useState(false);
	const [anchorEl, setAnchorEl] = useState(null);
	const [isOpen, setIsOpen] = useState(false);

	const open = Boolean(anchorEl);

	useEffect(() => {
		getOneData("/comment/", comment._id)
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
			const { likes } = await getOneData("/comment/", comment._id);
			likes.push(userGlobal._id);
			await updateData("/comment/", comment._id, {
				likes,
			});

			const user = await getOneData("/user/", userGlobal._id);
			user.commentLikes.push(comment._id);
			const userJSON = await updateData("/user/", userGlobal._id, {
				commentLikes: user.commentLikes,
			});

			const { comments } = await getOneData(
				"/publication/",
				location.pathname.split("/")[2]
			);

			dispatch(setGlobalUser(userJSON));
			setCommentList(comments.reverse());
			setIsLiked(like);
		} else {
			const { likes } = await getOneData("/comment/", comment._id);
			const disLike = likes.filter((item) => item._id !== userGlobal._id);
			await updateData("/comment/", comment._id, {
				likes: disLike,
			});

			const user = await getOneData("/user/", userGlobal._id);
			const disLikeUser = user.commentLikes.filter(
				(item) => item._id !== comment._id
			);
			const userJSON = await updateData("/user/", userGlobal._id, {
				commentLikes: disLikeUser,
			});

			const { comments } = await getOneData(
				"/publication/",
				location.pathname.split("/")[2]
			);

			dispatch(setGlobalUser(userJSON));
			setCommentList(comments.reverse());
			setIsLiked(like);
		}
	};

	const deleteComment = async () => {
		await deleteData("/comment/", comment._id);

		const { comments } = await getOneData(
			"/publication/",
			location.pathname.split("/")[2]
		);
		const filteredPublication = comments.filter(
			(item) => item._id !== comment._id
		);
		const data = await updateData(
			"/publication/",
			location.pathname.split("/")[2],
			{ comments: filteredPublication }
		);

		const userComments = await getOneData("/user/", userGlobal._id);
		const filteredUser = userComments.comments.filter(
			(item) => item._id !== comment._id
		);
		const commentLikes = userComments.commentLikes.filter(
			(item) => item._id !== comment._id
		);
		const userJSON = await updateData("/user/", userGlobal._id, {
			comments: filteredUser,
			commentLikes,
		});

		dispatch(setGlobalUser(userJSON));
		setCommentList(data.comments.reverse());
	};

	return (
		<Grow in={comment}>
			<article
				id={comment._id}
				className="flex flex-col items-start justify-between shadow-md p-3 rounded-md"
			>
				<div className="flex justify-between items-center gap-x-4 text-xs w-full">
					<div className="flex items-center gap-3">
						<Avatar
							alt={comment.author[0].username}
							src={comment.author[0].icon}
						/>
						<p className="font-semibold text-gray-900">
							<Link
								to={
									userGlobal._id === comment.author[0]._id
										? "/profile"
										: `/user/${comment.author[0]._id}`
								}
							>
								{comment.author[0].username}
							</Link>
						</p>
					</div>
					<div className="flex items-center">
						<time dateTime={comment.date} className="text-gray-500">
							{comment.date.split("T")[0]}{" "}
							{comment.date.split("T")[1].split(":")[0] - 3}:
							{comment.date.split("T")[1].split(":")[1]}
						</time>
						{userGlobal._id === comment.author[0]._id && (
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
							<MenuItem onClick={deleteComment}>
								<DeleteIcon /> Eliminar
							</MenuItem>
						</Menu>
					</div>
				</div>
				<CommentEdit
					isOpen={isOpen}
					setIsOpen={setIsOpen}
					comment={comment}
					setCommentList={setCommentList}
				/>
				<div className="group relative w-full">
					<p className="mt-5 line-clamp-3 text-sm leading-6 text-gray-600">
						{comment.content}
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
								<b>{comment.likes.length}</b>
							</span>
						</div>
					</div>
				</div>
			</article>
		</Grow>
	);
};
