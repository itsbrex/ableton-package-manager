import React, { useEffect, useState } from 'react';
import { Text } from 'ink';
import Spinner from 'ink-spinner';
import { helpText } from './lib/messages';
// import { updateSuccessInstructions } from './lib/messages';
import update from './lib/update';

function Update({ input = [] }: { input?: string[] }) {
  const [inProgress, setInProgress] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const inputUrl = input?.[0];
  if (!inputUrl) {
    return <Text>{helpText}</Text>;
  }

  useEffect(() => {
    (async () => {
      try {
        const message = await update({ inputUrl });
        setSuccessMessage(message);
      } catch (e) {
        if (e instanceof Error) {
          setErrorMessage(e?.message);
        }
      }
      setInProgress(false);
    })();
  }, []);

  if (errorMessage) {
    return <Text color="red">Error: {errorMessage}</Text>;
  }

  return (
    <>
      {inProgress && (
        <Text>
          <Text color="green">
            <Spinner type="mindblown" />
          </Text>
          {` Updating ${inputUrl}...`}
        </Text>
      )}

      {!inProgress && (
        <>
          <Text color="green">{successMessage}</Text>
          {/* <Text>{updateSuccessInstructions}</Text> */}
        </>
      )}
    </>
  );
}

export default Update;
