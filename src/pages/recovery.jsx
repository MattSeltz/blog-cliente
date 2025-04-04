import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { green } from "@mui/material/colors";
import { CircularProgress, Box } from "@mui/material";

import { getData, postData, updateData } from "../services/services";

export const Recovery = () => {
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [errorMessage, setErrorMessage] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [isMatch, setIsMatch] = useState(true);
	const [successMessage, setSuccessMessage] = useState(false);
	const [code, setCode] = useState("");
	const [success, setSuccess] = useState(false);
	const [codeToMatch, setCodeToMatch] = useState(null);
	const [userID, setUserID] = useState(null);
	const [password, setPassword] = useState("");
	const [comparedPassword, setComparedPassword] = useState("");

	const send = async (e) => {
		e.preventDefault();

		if (userID) {
			if (password && comparedPassword) {
				setErrorMessage(false);
				if (password === comparedPassword) {
					setIsLoading(true);
					setIsMatch(true);

					await updateData("/auth/recovery/", userID, {
						password,
					});

					navigate("/login");

					setIsLoading(false);
				} else {
					setIsMatch(false);
				}

				setPassword("");
				setComparedPassword("");
			} else {
				setErrorMessage(true);
			}
		} else {
			if (success) {
				setSuccessMessage(false);
				if (code === codeToMatch) {
					setErrorMessage(false);

					const res = await getData("/user");

					const user = res.filter((item) => item.email === email);

					setUserID(user[0]._id);
				} else {
					setErrorMessage(true);
				}
			} else {
				if (email) {
					const rand = crypto.randomUUID().split("-")[0];
					setCodeToMatch(rand);
					setSuccessMessage(false);
					setSuccess(false);
					setErrorMessage(false);
					setIsLoading(true);
					setIsMatch(true);

					await postData("/email/recovery", {
						email,
						code: rand,
					});

					setSuccessMessage(true);
					setSuccess(true);

					setIsLoading(false);
				} else {
					setErrorMessage(true);
				}
			}
		}
	};

	return (
		<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
			<div className="sm:mx-auto sm:w-full sm:max-w-sm">
				<img
					className="mx-auto h-10 w-auto"
					src="https://cdn-icons-png.flaticon.com/128/1168/1168120.png"
					alt="XYZ"
				/>
				<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
					Recuperación de cuenta
				</h2>
			</div>

			{errorMessage && (
				<p className="mt-3 text-center text-xl text-red-500">
					{success ? "Código incorrecto" : "Falta completar datos"}
				</p>
			)}

			{!isMatch && (
				<p className="mt-3 text-center text-xl text-red-500">
					{userID ? "No coinciden las contraseñas" : "Email incorrecto"}
				</p>
			)}

			{successMessage && (
				<p className="mt-3 text-center text-xl text-green-500">
					Email enviado, por favor revisa tu bandeja de entrada
				</p>
			)}

			<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
				<form className="space-y-6" autoComplete="off" onSubmit={send}>
					{userID ? (
						<>
							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Nueva contraseña
								</label>
								<div className="mt-2">
									<input
										value={password}
										onChange={(e) => setPassword(e.target.value)}
										id="password"
										name="password"
										type="password"
										required
										className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="comparedPassword"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Repita la contraseña
								</label>
								<div className="mt-2">
									<input
										value={comparedPassword}
										onChange={(e) => setComparedPassword(e.target.value)}
										id="comparedPassword"
										name="comparedPassword"
										type="password"
										required
										className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
									/>
								</div>
							</div>
						</>
					) : success ? (
						<div>
							<label
								htmlFor="code"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Código
							</label>
							<div className="mt-2">
								<input
									value={code}
									onChange={(e) => setCode(e.target.value)}
									id="code"
									name="code"
									type="text"
									required
									className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
					) : (
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email
							</label>
							<div className="mt-2">
								<input
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									id="email"
									name="email"
									type="email"
									required
									className="block w-full rounded-md border-0 p-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>
					)}

					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							cursor: isLoading && "no-drop",
						}}
					>
						<Box sx={{ width: "100%", position: "relative" }}>
							<button
								type="submit"
								disabled={isLoading}
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 p-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								style={{ cursor: isLoading && "no-drop" }}
							>
								Enviar
							</button>
							{isLoading && (
								<CircularProgress
									size={24}
									sx={{
										color: green[500],
										position: "absolute",
										top: "50%",
										left: "50%",
										marginTop: "-12px",
										marginLeft: "-12px",
										cursor: isLoading && "no-drop",
									}}
								/>
							)}
						</Box>
					</Box>
				</form>

				<p className="mt-10 text-center text-sm text-gray-500">
					Ya tienes una cuenta?{" "}
					<Link
						className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
						to="/login"
					>
						Inicia sesión
					</Link>
				</p>
			</div>
		</div>
	);
};
