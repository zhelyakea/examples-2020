import React, { useEffect, useState, useCallback } from "react";
import { useRecoilValue, useRecoilState } from "recoil";
import { block } from "bem-cn";

import Input from "components/Input";
import { authState } from "models";
import { get } from "services";
import { useOutsideClick } from "hooks";
import {
  markerImageSelector,
  brandsSelector,
  SET_LIST,
  getSetModelType,
} from "models";
import "./style.css";

const b = block("input-selector-data");

type InputSelectDataT = {
  name: string;
  title: string;
  value: string;
  url: string;
};

export default function InputSelectData({
  name,
  title,
  value,
  url,
}: InputSelectDataT) {
  const [isOpen, setIsOpen] = useState(false);
  const [items, setList] = useRecoilState(brandsSelector(name));
  const [, setModel] = useRecoilState(markerImageSelector);
  const { token } = useRecoilValue(authState);
  const list = items.list;

  useEffect(() => {
    async function getList(token: string) {
      try {
        const { results } = await get(url, token);
        setList({ actionType: SET_LIST, list: results });
      } catch (error) {
        console.log(error);
      }
    }
    if (token) {
      getList(token);
    }
  }, [setList, token, url]);

  const toggleList = useCallback(() => setIsOpen(!isOpen), [isOpen]);
  const closeList = useCallback(() => setIsOpen(false), []);
  const inputSelectDataRef = useOutsideClick(() => {
    if (isOpen) {
      setIsOpen(false);
    }
  });
  const selectItem = useCallback(
    (value: any) => {
      const actionType = getSetModelType(name);
      setModel({ actionType, list: value });
      closeList();
    },
    [closeList, name, setModel]
  );
  return (
    <div className={b("container")} ref={inputSelectDataRef}>
      <Input {...{ title, value }} isSelectable onClick={toggleList} />
      {isOpen && (
        <div className={b("list")}>
          {list &&
            list.map((t: any) => {
              const selectBrandHandler = () => {
                selectItem(t);
              };
              return (
                <div
                  className={b("list-item")}
                  key={t.id}
                  onClick={selectBrandHandler}
                >
                  {t.title}
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
