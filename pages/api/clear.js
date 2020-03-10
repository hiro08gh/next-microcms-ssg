//Preview ModeのCookieを削除
//http://localhost:3000/api/clear
export default (req, res) => {
  // Clears the preview mode cookies.
  // This function accepts no arguments.
  res.clearPreviewData();
  res.writeHead(307, {Location: '/'});
  res.end();
};
