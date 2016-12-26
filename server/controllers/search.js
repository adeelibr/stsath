module.exports = {

  choice: function (req, res, next) {
    var optionOne = req.query.option_one;
    var optionTwo = req.query.option_two;

    var options = [ optionOne, optionTwo ];
    var today = new Date();

    var twittter

    return res.status(200).json({
      success: true,
      message: "Choices results found",
      options: options
    })
  }

};
