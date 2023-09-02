const { user, board } = require("../models/mysql");
const { Op } = require("sequelize");
const { generateToken } = require("./authController");

exports.getUserList = async (req, res) => {
	try {
		const userList = await user.findAll({
			where: {
				grade: 1,
			}
		});
		const totalUser = userList.length;
		return res.status(200).json({ userList, totalUser });
	} catch (e) {
		console.error(e);
		return res.status(400).json({ listError: true });
	}
}
exports.getUserDetail = async (req, res) => {
	const { id } = req.body;

	try {
		const User = await user.findOne({
			where: {
				id,
			}
		})

		return res.status(200).json({ user: User });
	} catch (e) {
		console.error(e);
		return res.status(400).json({ userError: true });
	}
}
exports.deleteUser = async (req, res) => {
	const { id } = req.params;

	try {
		const exUser = await user.findOne({
			where: {
				id,
			}
		});

		if (exUser) {
			await exUser.destroy();
			return res.status(200).json({ deleteError: false });
		}

	} catch (e) {
		console.error(e);
		return res.status(400).json({ deleteError: true });
	}
}

exports.getUserAction = async (req, res) => {
	const date = new Date();
	const Year = date.getFullYear();
	const Month = date.getMonth();
	const Day = date.getDate();
	const today = new Date(Year, Month, Day + 1, 0, 0, 0);

	let dailyJoinCnt = []; //일일가입자수
	let allUserCnt = []; //누적가입자수

	try {
		//일일가입자수
		for (let i = 6; i >= 0; i--) {
			let day = new Date(Date.parse(today) - i * 1000 * 60 * 60 * 24);
			let aday = new Date(Date.parse(today) - (i + 1) * 1000 * 60 * 60 * 24);
			let joinCnt = await user.findAndCountAll({
				where: {
					reg: {
						[Op.between]: [aday, day],
					}
				}
			});
			dailyJoinCnt.push(joinCnt.count);
		}
		//누적가입자수
		for (let i = 6; i >= 0; i--) {
			let day = new Date(Date.parse(today) - i * 1000 * 60 * 60 * 24);
			let userCnt = await user.findAndCountAll({
				where: {
					reg: {
						[Op.lte]: day,
					}
				}
			});
			allUserCnt.push(userCnt.count);
		}

		res.status(200).json({ userAction: { dailyJoinCnt, allUserCnt } });
	} catch (e) {
		console.error(e);
		res.status(400).json({ userActionError: true });
	}
}

exports.getBoardList = async (req, res) => {
	try {
		const boardList = await board.findAll({
			order: [
				['grade', 'DESC']
			],
			where: {
				done: 1
			}
		});
		const totalBoard = boardList.length;

		return res.status(200).json({ boardList, totalBoard })
	} catch (e) {
		console.error(e);
		res.status(400).json({ listError: true });
	}
}

exports.getBoardDetail = async (req, res) => {
	const { no } = req.body;

	try {
		const Board = await board.findOne({
			where: {
				no,
			}
		});
		res.status(200).json({ board: Board });
	} catch (e) {
		console.error(e);
		res.status(400).json({ boardError: true });
	}
}

exports.getBoardAction = async (req, res) => {
	const date = new Date();
	const Year = date.getFullYear();
	const Month = date.getMonth();
	const Day = date.getDate();
	const today = new Date(Year, Month, Day + 1, 0, 0, 0);

	let allWriteCnt = [];
	let dailyWriteCnt = [];
	try {
		//일일게시물수
		for (let i = 6; i >= 0; i--) {
			let day = new Date(Date.parse(today) - i * 1000 * 60 * 60 * 24);
			let aday = new Date(Date.parse(today) - (i + 1) * 1000 * 60 * 60 * 24); //당일 00시
			let writeCnt = await board.findAndCountAll({
				where: {
					createAt: {
						[Op.between]: [aday, day], //00시 ~ 00시 사이
					}
				}
			});
			dailyWriteCnt.push(writeCnt.count);
		}
		//누적게시물수
		for (let i = 6; i >= 0; i--) {
			let day = new Date(Date.parse(today) - i * 1000 * 60 * 60 * 24);
			let writeCnt = await board.findAndCountAll({
				where: {
					createAt: {
						[Op.lte]: day,
					}
				}
			});
			allWriteCnt.push(writeCnt.count);
		}

		res.status(200).json({ boardAction: { dailyWriteCnt, allWriteCnt } });
	} catch (e) {
		console.error(e);
		res.status(400).json({ boardActionError: true });
	}
}

exports.deleteBoard = async (req, res) => {
	const { no } = req.params;

	try {
		const exBoard = await board.findOne({
			where: {
				no,
			}
		});

		if (exBoard) {
			await exBoard.destroy();
			return res.status(200).json({ deleteError: false });
		}

	} catch (e) {
		console.error(e);
		return res.status(400).json({ deleteError: true });
	}
}

exports.createNotice = async (req, res) => { // 공지사항 생성 3개까지만 생성되도록 할 예정.
	try {
		const { title, content, id } = req.body;
		const noticeTotal = await board.findAndCountAll({
			where: { grade: 2, done: 1 }
		});
		if (noticeTotal.count <= 2) {
			const notice = await board.create({
				title,
				content,
				id,
				grade: 2
			});
			return res.json({ board: notice });
		}
	} catch (error) {
		console.error(error);
		return res.json({ boardError: error });
	}
}

exports.doneNotice = async (req, res) => {
	try {
		const { no } = req.body;
		const notice = await board.update({ done: 0 }, { where: { no } });
		return res.json({ board: notice });
	} catch (error) {
		console.error(error);
		return res.json({ boardError: error });
	}
}

//adminTerms
exports.getAdmin = async (req, res) => {
	const { id } = req.params;

	try {
		const exAdmin = await user.findOne({
			where: {
				id,
			}
		});

		if (exAdmin) {
			return res.status(200).json({ admin: exAdmin });
		}

	} catch (e) {
		console.error(e);
		return res.status(400).json({ adminError: true });
	}
}

exports.changeInform = async (req, res) => {
	const { id } = req.params;
	const { businessName, nick, phone, addr1, addr2 } = req.body;
	const newAdminId = `testAdmin@${businessName}.com`;

	try {
		await user.update({ id: newAdminId, nick, phone, addr1, addr2 }, { where: { id } });
		const updatedAdmin = await user.findOne({ where: { id: newAdminId } });

		//토큰 재설정 안해주면 정보 수정후 localStorage 및 쿠키에는 상호 변경전 아이디의 정보가 들어가있음
		const token = generateToken(newAdminId, updatedAdmin.nick, updatedAdmin.gender, updatedAdmin.grade, updatedAdmin.style, updatedAdmin.no);
		res.cookie("access_token", token, {
			maxAge: 1000 * 60 * 60 * 24 * 7,
			httpOnly: true,
		});

		if (updatedAdmin) {
			return res.status(200).json({ admin: updatedAdmin });
		}
	} catch (e) {
		console.error(e);
		return res.status(400).json({ changeInformError: true });
	}
}

exports.getAdminTerms = async (req, res) => {
	const { id, type } = req.params;

	try {
		const exTerms = await board.findOne({
			where: {
				id,
				type,
			}
		});

		if (exTerms) {
			return res.status(200).json({ getTerms: exTerms });
		}

	} catch (e) {
		console.error(e);
		return res.status(400).json({ getTermsError: true });
	}
}

exports.editAdminTerms = async (req, res) => {
	const { id, type } = req.params;
	const { content } = req.body;

	try {
		const exTerms = await board.findOne({
			where: {
				id,
				title: type,
				type,
				grade: 2,
			}
		});

		if (!exTerms) {
			const newTerms = await board.create({
				id,
				title: type,
				content,
				type,
				grade: 2,
			}, {
				where: {
					id,
					title: type,
					type,
					grade: 2,
				}
			})
			return res.status(200).json({ editTerms: newTerms });
		}

		if (exTerms) {
			const updatedTerms = await board.update({
				content
			}, {
				where: {
					id,
					title: type,
					type,
					grade: 2,
				}
			});

			return res.status(200).json({ editTerms: updatedTerms });
		}
	} catch (e) {
		console.error(e);
		return res.status(400).json({ editTermsError: true });
	}
}

exports.getStyle = async (req, res) => {
	const { id } = req.params;

	try {
		const admin = await user.findOne({ raw: true, where: { id } });
		const adminStyle = admin.style;

		return res.status(200).json({ adminStyle });
	} catch (e) {
		console.error(e);
		return res.status(400).json({ amdinStyleError: true })
	}
}

exports.changeStyle = async (req, res) => {
	const { id, adminStyle } = req.params;

	try {
		await user.update({ style: adminStyle }, { where: { id } });
		const admin = await user.findOne({ raw: true, where: { id } });
		const Style = admin.style;

		return res.status(200).json({ adminStyle: Style });
	} catch (e) {
		console.error(e);
		return res.status(400).json({ adminStyleError: true })
	}
}