- Add "steps" & "step-increment" attrs
- Add "min" & "max" attrs ^ interact with the step attrs

ex)

<author-slider step-increment="2" min="0" max="10"></author-slider>

This will add steps at 2, 4, 6, and 8 in addition to 0 and 10.

- Also add min-x, min-y, max-x & max-y attrs

<author-slider steps="1 5 6 9 11" max="15"></author-slider>

^ This will only allow the specified steps to be selected in addition to min and max- "min" will default to 0 if no attr is specified.
