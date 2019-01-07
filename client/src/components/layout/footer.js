import React, { Component } from 'react'

export default () => {
    return (
        <footer className="bg-dark text-white mt-5 p-4 text-center" style={{left:0,right:0,position: 'absolute'}}>
            Copyright &copy; {new Date().getFullYear()} devhub
        </footer>
    )
}