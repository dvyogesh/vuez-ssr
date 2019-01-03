// const upload = e => {
//   const files = e.target.files || e.dataTransfer.files;
//   //console.log(files);
//   if (!files.length) return;
//   this.createImage(files[0]);
//   this.orderNow(e);

//   const createImage = file => {
//     var image = new Image();
//     var reader = new FileReader();
//     var vm = this;

//     reader.onload = e => {
//       vm.image = e.target.result;
//       //console.log(vm.image);
//     };
//     reader.readAsDataURL(file);
//   };
// };

// export default upload;
