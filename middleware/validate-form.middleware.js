exports.validatePostProduct = (req, res, next) => {
  const { product_name, description, price, stock } = req.body;
  let err = {
    product_name: null,
    description: null,
    price: null,
    stock: null,
  };
  let status = true;
  if (!product_name) err.product_name = "Nama Produk wajib diisi.";
  if (!description) err.description = "Deskripsi wajib diisi.";
  if (!price) err.price = "Harga wajib diisi.";
  if (price && price < 0) err.price = "Harga tidak boleh kurang dari 0.";
  if (stock && stock < 0) err.stock = "Stok tidak boleh kurang dari 0.";

  for (const key in err) {
    if (err[key] !== null) status = false;
  }

  if (!status) {
    return res.status(400).json({
      status,
      message: "Field tidak valid",
      data: null,
      err,
    });
  } else {
    next();
  }
};

exports.validatePostAkun = (req, res, next) => {
  const { nama_akun, kode_akun, kategori } = req.body;
  let err = {
    nama_akun: null,
    kode_akun: null,
    kategori: null,
  };
  let status = true;
  if (!nama_akun) err.nama_akun = "Nama Akun wajib diisi.";
  if (!kode_akun) err.kode_akun = "Kode Akun wajib diisi.";
  if (!kategori) err.kategori = "Kategori wajib diisi.";

  for (const key in err) {
    if (err[key] !== null) status = false;
  }

  if (!status) {
    return res.status(400).json({
      status,
      message: "Field tidak valid",
      data: null,
      err,
    });
  } else {
    next();
  }
};

exports.validatePostPembelian = (req, res, next) => {
  const { akun, tipe, waktu, quantity, uuid_product } = req.body;
  let err = {
    akun: null, 
    tipe: null, 
    waktu: null, 
    quantity: null, 
    uuid_product: null,
  };
  let status = true;
  if (!akun) err.akun = "Akun wajib diisi.";
  if (!tipe) err.tipe = "Tipe wajib diisi.";
  if (!waktu) err.waktu = "Waktu wajib diisi.";
  if (!quantity) err.quantity = "Quantity wajib diisi.";
  if (quantity && quantity < 0) err.quantity = "Quantity tidak boleh kurang dari 0.";
  if (!uuid_product) err.uuid_product = "Produk wajib diisi.";

  for (const key in err) {
    if (err[key] !== null) status = false;
  }

  if (!status) {
    return res.status(400).json({
      status,
      message: "Field tidak valid",
      data: null,
      err,
    });
  } else {
    next();
  }
};

exports.validatePostBiaya = (req, res, next) => {
  const { id_akun, deskripsi, jumlah } = req.body;
  let err = {
    id_akun: null, 
    deskripsi: null, 
    jumlah: null
  };
  let status = true;
  if (!id_akun) err.id_akun = "Akun wajib diisi.";
  if (!deskripsi) err.deskripsi = "Deskripsi wajib diisi.";
  if (!jumlah) err.jumlah = "Jumlah wajib diisi.";
  if (jumlah && jumlah < 0) err.jumlah = "Jumlah tidak boleh kurang dari 0.";

  for (const key in err) {
    if (err[key] !== null) status = false;
  }

  if (!status) {
    return res.status(400).json({
      status,
      message: "Field tidak valid",
      data: null,
      err,
    });
  } else {
    next();
  }
};

exports.validatePostKaryawan = (req, res, next) => {
  const { 
    full_name,
    email,
    password,
    role,
    nickname,
    address,
    handphone,
    gender,
    birthday,
   } = req.body;
  let err = {
    full_name: null,
    email: null,
    password: null,
    role: null,
    nickname: null,
    address: null,
    handphone: null,
    gender: null,
    birthday: null,
  };
  let status = true;
  if (!full_name) err.full_name = "Nama Lengkap wajib diisi.";
  if (!email) err.email = "Email wajib diisi.";
  if (!password) err.password = "Password wajib diisi.";
  if (!role) err.role = "Role wajib diisi.";
  if (!nickname) err.nickname = "Username wajib diisi.";
  if (!address) err.address = "Address wajib diisi.";
  if (!handphone) err.handphone = "No Hp wajib diisi.";
  if (!gender) err.gender = "Jenis Kelamin wajib diisi.";
  if (!birthday) err.birthday = "Tanggal Lahir wajib diisi.";

  for (const key in err) {
    if (err[key] !== null) status = false;
  }

  if (!status) {
    return res.status(400).json({
      status,
      message: "Field tidak valid",
      data: null,
      err,
    });
  } else {
    next();
  }
};