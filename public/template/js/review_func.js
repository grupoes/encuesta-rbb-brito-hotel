jQuery(function($) {
    "use strict";

    // Wizard form configuration
    $('#wizard_container').wizard({
        stepsWrapper: '#wrapped',
        submit: '.submit',
        beforeSelect: function(event, state) {
            // Prevent proceeding if website input is empty
            if ($('input#website').val().length != 0) {
                return false;
            }

            // Only allow moving forward if current step is valid
            if (!state.isMovingForward) {
                return true;
            }

            var currentStep = $(this).wizard('state').step.find(':input');
            return !currentStep.length || !!currentStep.valid();
        }
    }).validate({
        // Custom error placement for radio and checkbox
        errorPlacement: function(error, element) {
            if (element.is(':radio') || element.is(':checkbox')) {
                error.insertBefore(element.next());
            } else {
                error.insertAfter(element);
            }
        }
    });

    // Progress bar initialization
    $('#progressbar').progressbar();

    // Update progress bar and location text after step selection
    $('#wizard_container').wizard({
        afterSelect: function(event, state) {
            $('#progressbar').progressbar('value', state.percentComplete);
            $('#location').text('(' + state.stepsComplete + '/' + state.stepsPossible + ')');
        }
    });

    // Form validation rules
    $('#wrapped').validate({
        ignore: [],
        rules: {
            select: { required: true }
        },
        errorPlacement: function(error, element) {
            if (element.is('select:hidden')) {
                error.insertAfter(element.next('.nice-select'));
            } else {
                error.insertAfter(element);
            }
        }
    });

    const urlbase = document.getElementById('urlbase').value;

    const wrapped = document.getElementById('wrapped');

    wrapped.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(wrapped);

        fetch(urlbase+'saveFormSurvey', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.respuesta === 'ok') {
                window.location.href = urlbase+"esperamos-nuevamente-su-visita";
            }
            
        })
    })

});

// Function to update rating/review input values
function getVals(input, inputName) {
    switch(inputName) {
        case 'rating_input_1':
            var value = $(input).val();
            $('#rating_input_1').text(value);
            break;
        case 'rating_input_2':
            var value = $(input).val();
            $('#rating_input_2').text(value);
            break;
        case 'rating_input_3':
            var value = $(input).val();
            $('#rating_input_3').text(value);
            break;
        case 'rating_input_4':
            var value = $(input).val();
            $('#rating_input_4').text(value);
            break;
        case 'rating_input_5':
            var value = $(input).val();
            $('#rating_input_5').text(value);
            break;
        case 'review_message':
            var value = $(input).val();
            $('#review_message').text(value);
            break;
    }

    
}