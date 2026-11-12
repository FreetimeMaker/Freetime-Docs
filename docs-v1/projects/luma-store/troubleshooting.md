# Troubleshooting

## A source shows no apps

Test retrieval, parsing and filtering independently. For Luma Store metadata also verify backend visibility/approval state.

## Images do not render

The Android client uses Coil. Verify the stored remote URL and that it returns a decodable image.

## Dashboard build fails

Run `npm run type-check` and `npm run lint` before `npm run build` to isolate TypeScript and lint errors.
