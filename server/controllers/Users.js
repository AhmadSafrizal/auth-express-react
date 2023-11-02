import Users from "../models/UserModel.js"
import argon2 from 'argon2'

export const getUsers = async (req, res) => {
  try {
    const data = await Users.findAll()
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const getUserById = async (req, res) => {

  const {id} = req.params

  try {
    const data = await Users.findOne({
      where: {
        uuid: id
      }
    })
    res.status(200).json(data)
  } catch (error) {
    res.status(500).json({
      message: error.message
    })
  }
}

export const createUser = async (req, res) => {

  const {name, email, password, confirmPassword, role} = req.body

  if(password !== confirmPassword) return res.status(400).json({
    message: "Password yang dimasukan harus sama!"
  })

  const hashedPassword = await argon2.hash(password)

  try {
    await Users.create({
      name,
      email,
      password: hashedPassword,
      role
    })
    res.status(201).json({
      message: "Register Berhasil..."
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}

export const updateUser = async (req, res) => {

  const {id} = req.params

  const user = await Users.findOne({
    where: {
      uuid: id
    }
  })

  if(!user) return res.status(404).json({
    message: "User tidak ditemukan"
  })

  const {name, email, password, confirmPassword, role} = req.body

  let hashedPassword

  if(password === "" || password === null ) {
    hashedPassword = user.password
  } else {
    hashedPassword = await argon2.hash(password)
  }

  if(password !== confirmPassword) return res.status(400).json({
    message: "Password yang dimasukan harus sama!"
  })

  try {
    await Users.update({
      name,
      email,
      password: hashedPassword,
      role
    },
    {
      where: {
        id: user.id
      }
    })
    res.status(200).json({
      message: "Update Berhasil..."
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }

}

export const deleteUser = async (req, res) => {
  
  const {id} = req.params

  const user = await Users.findOne({
    where: {
      uuid: id
    }
  })

  if(!user) return res.status(404).json({
    message: "User tidak ditemukan"
  })

  try {
    await Users.destroy({
      where: {
        id: user.id
      }
    })
    res.status(200).json({
      message: "Hapus Berhasil..."
    })
  } catch (error) {
    res.status(400).json({
      message: error.message
    })
  }
}
