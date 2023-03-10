import React, { useEffect, useState } from 'react';

export default function Film(props) {
  return (
    <div>
      <h4>HEJ FILMER</h4>
      <div>{props.filmtitel}</div>
    </div>
  );
}
