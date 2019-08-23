import { copyFile } from 'fs';

const final = [];
$('.mw-category-group ul li').each((error, data) => {
  final.push(
    $(data)
      .find('a')
      .text()
  );
});
// right click and store as global variable
copyFile(temp1);
