
const scrollToTopBtn = document.getElementById('scrollToTopBtn');

// Show or hide the button based on scroll position
window.addEventListener('scroll', () => {
  if (window.scrollY > 100) { // Show the button after scrolling 100px
    scrollToTopBtn.classList.add('show');
  } else {
    scrollToTopBtn.classList.remove('show');
  }
});

// Smooth scroll to top functionality
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


  function handleButtonClick(event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (name && email && subject && message) {
      const alertMessage = document.querySelector("#alert-success p").innerText;

      const overlay = document.createElement("div");
      overlay.classList.add("overlay", "visible");
      document.body.appendChild(overlay);

      const popup = document.createElement("div");
      popup.classList.add("popup-card", "visible");
      popup.innerHTML = `
        <img src="assets/images/popup-contactme.png" alt="Success Icon">
        <h1>Thank You</h1>
        <h3>Thanks for Reaching Out!</h3>
        <p>${alertMessage}</p>
      `
      ;
      document.body.appendChild(popup);

      setTimeout(() => {
        popup.remove();
        overlay.remove();
      }, 10000);

      document.getElementById("cform").reset();
    } else {}
        
  }

  $(document).ready(function () {
    var allClicked = false; // Track if "All" has been clicked

    // Initially hide cards beyond the 6th card
    $('.works-col:nth-child(7)').hide();
    $('.works-col:nth-child(8)').hide();
    $('.works-col:nth-child(9)').hide();
    $('.works-col:nth-child(10)').hide();
    $('.works-col:nth-child(11)').hide();
    $('.works-col:nth-child(12)').hide();

    // Filter functionality
    $('.filter-links .lui-subtitle').click(function (e) {
        e.preventDefault();

        $('.filter-links .lui-subtitle').removeClass('active');
        $(this).addClass('active');

        var category = $(this).data('href');

        if (category === '.works-col' || category === 'all') {
            // Show only the first 6 items
            $('.works-col').show();
            $('.works-col:nth-child(n+7)').hide(); // Hide cards beyond the 6th card
            $('#load-more-btn').show(); // Ensure "View More" button appears
            allClicked = true; // Track that "All" has been clicked
        } else {
            // Hide all items first
            $('.works-col').hide();

            // Show only items matching the category
            $(category).fadeIn();

            $('.load-more-link, #load-more-btn').show();
            allClicked = false;
        }
    });
});


  // popup.js

// Function to create the popup dynamically
function createPopup() {
  let popupHTML = `
      <div id="overlay" class="overlay"></div>
      <div id="consultationPopup" class="popup-container">
          <div class="popup-content">
              <span class="close-btn">X</span>
              <div class="contacts-form">
                  <h3>Book Your Free Consultation</h3>
                  <form id="consultationForm">
                      <div class="row">
                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                          <div class="group">
                            <label>
                              Your Full Name <b>*</b>
                              <input type="text" name="name" id="name" >
                            </label>
                          </div>
                        </div>
                        <div class="col-xs-12 col-sm-6 col-md-6 col-lg-6">
                          <div class="group">
                            <label>
                              Your Email Address <b>*</b>
                              <input type="email" name="email" id="email" >
                            </label>
                          </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <div class="group">
                            <label>
                              Your Subject <b>*</b>
                              <input type="text" name="subject" id="subject">
                            </label>
                          </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">
                          <div class="group">
                            <label>
                              Your Message <b>*</b>
                              <textarea name="message" id="message"></textarea>
                            </label>
                          </div>
                        </div>
                        <div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 align-right">
                          <a href="#" class="btn" onclick="$('#cform').submit(); return false;">
                            <span>Send Message</span>
                          </a>
                        </div>
                      </div>
                  </form>
              </div>
          </div>
      </div>
  `;
  
  document.body.insertAdjacentHTML('beforeend', popupHTML);
}

// Function to show popup
function showPopup() {
  document.getElementById('consultationPopup').style.display = 'flex';
  document.getElementById('overlay').style.display = 'block';
}

// Function to hide popup
function hidePopup() {
  document.getElementById('consultationPopup').style.display = 'none';
  document.getElementById('overlay').style.display = 'none';
}

// Initialize popup
document.addEventListener('DOMContentLoaded', function() {
  createPopup(); // Inject the popup into the page

  document.querySelectorAll('.consultationButton').forEach(button => {
      button.addEventListener('click', showPopup);
  });

  document.querySelector('.close-btn').addEventListener('click', hidePopup);
  document.getElementById('overlay').addEventListener('click', hidePopup);
});

function filterWorks(category) {
      const worksBox = document.getElementById('works-box');
      const worksItems = document.querySelectorAll('.works-col');
      let visibleItems = 0;

      worksItems.forEach(item => {
        if (category === 'all' || item.classList.contains(category)) {
          item.style.display = 'block';
          visibleItems++;
        } else {
          item.style.display = 'none';
        }
      });

      worksBox.style.height = (visibleItems * 300) + 'px'; // Adjust the height based on the number of visible items
    }


