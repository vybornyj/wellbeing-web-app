import getConfig from 'next/config'
import nodemailer from 'nodemailer'

const { serverRuntimeConfig }: GetConfig = getConfig()

// @ts-ignore
const transport = nodemailer.createTransport(serverRuntimeConfig.NODEMAILER_CONFIG)

export const sendMail = async (options, errorCallback, successCallback) => {
  await transport.sendMail(options, (err, suc) => (err ? errorCallback(err) : successCallback(suc)))
}

export const verifySmtp = async (errorCallback, successCallback) => {
  await transport.verify((err, suc) => (err ? errorCallback(err) : successCallback(suc)))
}
